<?php

namespace App\Controller\TaskListControllers;

use App\Repository\BoardRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskListSerializer;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UpdateTaskListController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists/{list_id}",
     *      name="app_update_board_listing",
     *      requirements={"list_id"="\d+","board_id"="\d+"},
     *     methods={"PATCH"})
     */
    public function index(
        int            $board_id,
        int            $list_id,
        Request        $request,
        BoardRepository $boardRepository,
        TaskListSerializer $taskListSerializer,
        TaskListRepository $taskListRepository,
        ManagerRegistry $doctrine
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

        $taskList = $taskListRepository->findOneBy(['id'=>$list_id,'Board'=>$board]);
        if(!$taskList){
            return $this->json(["error" => "Task list not found"], 404);
        }
        if(isset($reqBody['title'])){
            $taskList->setTitle($reqBody['title']);
        }
        $doctrine = $doctrine->getManager();
        $doctrine->persist($taskList);
        $doctrine->flush();
        return $this->json(
            $taskListSerializer->TaskListToArray($taskList),
            Response::HTTP_OK
        );
    }

}
