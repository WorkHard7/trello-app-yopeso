<?php

namespace App\Controller\TaskItemControllers;

use App\Repository\BoardRepository;
use App\Repository\TaskItemRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskItemSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetTaskItemController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists/{list_id}/items/{item_id}",
     *      name="app_get_task_item",
     *     requirements={"list_id"="\d+","board_id"="\d+","item_id"="\d+"},
     *     methods={"GET"})
     */
    public function index(
        int             $board_id,
        int             $list_id,
        int             $item_id,
        BoardRepository $boardRepository,
        TaskItemRepository $taskItemRepository,
        TaskItemSerializer $taskItemSerializer,
        TaskListRepository $taskListRepository
    ): Response
    {

        $user = $this->getUser();

        $board = $boardRepository->findOneBy(['id' => $board_id]);

        if (!$board) {
            return $this->json(["error" => "Board not found"], 404);
        }

        if ($board->getAuthor() !== $user) {
            return $this->json(["error" => "User is not authorized"], 403);
        }

        $taskList = $taskListRepository->findOneBy(['id'=>$list_id,'Board'=>$board]);
        if(!$taskList){
            return $this->json(["error" => "Task list not found"], 404);
        }

        $task = $taskItemRepository->findOneBy(['id'=>$item_id,'TaskList'=>$taskList]);

        if(!$task){
            return $this->json(["error" => "Task item not found"], 404);
        }

        return $this->json(
            $taskItemSerializer->TaskItemToArray($task),
            Response::HTTP_OK
        );
    }

}
