<?php

namespace App\Controller\TaskListControllers;

use App\Repository\BoardRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskListSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetTaskListController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists/{list_id}",
     *      name="app_show_board_listing",
     *      requirements={"list_id"="\d+","board_id"="\d+"},
     *     methods={"GET"})
     */
    public function index(
        int            $board_id,
        int            $list_id,
        BoardRepository $boardRepository,
        TaskListSerializer $taskListSerializer,
        TaskListRepository $taskListRepository
    ): Response
    {
        $user = $this->getUser();

        $board = $boardRepository->findOneBy(['id' => $board_id]);

        if (!$board) {
            return $this->json(['error' => "Board not found"], 404);
        }

        if ($board->getAuthor() !== $user) {
            return $this->json(["error" => "User is not authorized"], 403);
        }

        $taskList = $taskListRepository->findOneBy(['id'=>$list_id,'Board'=>$board]);
        if(!$taskList){
            return $this->json(["error" => "Task list not found"], 404);
        }

        return $this->json(
            $taskListSerializer->TaskListToArray($taskList),
            Response::HTTP_OK
        );
    }

}
