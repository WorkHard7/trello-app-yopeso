<?php

namespace App\Controller\TaskListControllers;

use App\Repository\BoardRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskListSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ListTaskListsController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists",
     *      name="app_list_tasklists",
     *      requirements={"board_id"="\d+"},
     *     methods={"GET"})
     */
    public function index(
        int            $board_id,
        BoardRepository $boardRepository,
        TaskListSerializer $taskListSerializer): Response
    {
        $user = $this->getUser();

        $board = $boardRepository->findOneBy(['id' => $board_id]);

        if (!$board) {
            return $this->json(['error' => "Board not found"], 404);
        }

        if ($board->getAuthor() !== $user) {
            return $this->json(["error" => "User is not authorized"], 403);
        }

        $responseBody = [];

        $taskLists = $board->getTaskLists();
        foreach($taskLists as $taskList){
            $responseBody[] = $taskListSerializer->TaskListToArray($taskList);
        }

        return $this->json(
            $responseBody,
            Response::HTTP_OK
        );
    }

}
