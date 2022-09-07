<?php

namespace App\Controller\TaskListControllers;

use App\Entity\TaskList;
use App\Repository\BoardRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskListSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreateTaskListController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists",
     *      name="app_create_board_listing",
     *      requirements={"board_id"="\d+"},
     *     methods={"POST"})
     */
    public function index(
        int             $board_id,
        Request        $request,
        BoardRepository $boardRepository,
        TaskListSerializer $taskListSerializer,
        TaskListRepository $taskListRepository
    ): Response
    {
        $reqBody = $request->getContent();
        $reqBody = json_decode($reqBody, true);

        $user = $this->getUser();

        $board = $boardRepository->findOneBy(['id' => $board_id]);

        if (!$board) {
            return $this->json([error => "Board not found"], 404);
        }

        if ($board->getAuthor() !== $user) {
            return $this->json([error => "User is not authorized"], 403);
        }

        $taskList = new TaskList();
        $taskList->setBoard($board)
            ->setTitle($reqBody['title']);

        $taskListRepository->add($taskList,true);

        return $this->json(
            $taskListSerializer->TaskListToArray($taskList),
            Response::HTTP_OK
        );
    }

}
