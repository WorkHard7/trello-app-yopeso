<?php

namespace App\Controller\TaskListControllers;

use App\Repository\BoardRepository;
use App\Repository\TaskListRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DeleteTaskListController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists/{list_id}",
     *      name="app_delete_board_listing",
     *     requirements={"list_id"="\d+","board_id"="\d+"},
     *     methods={"DELETE"})
     */
    public function index(
        int            $board_id,
        int            $list_id,
        BoardRepository $boardRepository,
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
        $taskListRepository->remove($taskList,true);

        return $this->json(
           "Succesfully deleted task list",
            Response::HTTP_OK
        );
    }

}
