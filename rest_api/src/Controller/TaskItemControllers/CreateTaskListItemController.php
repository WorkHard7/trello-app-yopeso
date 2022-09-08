<?php

namespace App\Controller\TaskItemControllers;

use App\Entity\TaskItem;
use App\Repository\BoardRepository;
use App\Repository\TaskItemRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskItemSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreateTaskListItemController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists/{list_id}/items",
     *      name="app_create_board_list_item",
     *     requirements={"list_id"="\d+","board_id"="\d+"},
     *     methods={"POST"})
     */
    public function index(
        int             $board_id,
        int             $list_id,
        Request        $request,
        BoardRepository $boardRepository,
        TaskItemRepository $taskItemRepository,
        TaskItemSerializer $taskItemSerializer,
        TaskListRepository $taskListRepository
    ): Response
    {
        $reqBody = $request->getContent();
        $reqBody = json_decode($reqBody, true);

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

        $task = new TaskItem();
        if(!isset($reqBody['title'])){
            return $this->json(["error" => "Title field is required"], 400);
        }

        $task->setTitle($reqBody['title']);
        $task->setTaskList($taskList);

        $taskItemRepository->add($task,true);

        return $this->json(
            $taskItemSerializer->TaskItemToArray($task),
            Response::HTTP_OK
        );
    }

}
