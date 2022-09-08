<?php

namespace App\Controller\TaskItemControllers;

use App\Repository\BoardRepository;
use App\Repository\TaskItemRepository;
use App\Repository\TaskListRepository;
use App\Serializer\TaskItemSerializer;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UpdateTaskItemController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}/lists/{list_id}/items/{item_id}",
     *      name="app_update_task_item",
     *     requirements={"list_id"="\d+","board_id"="\d+","item_id"="\d+"},
     *     methods={"PATCH"})
     */
    public function index(
        int             $board_id,
        int             $list_id,
        int             $item_id,
        Request        $request,
        BoardRepository $boardRepository,
        TaskItemRepository $taskItemRepository,
        TaskItemSerializer $taskItemSerializer,
        TaskListRepository $taskListRepository,
        ManagerRegistry $doctrine
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

        $task = $taskItemRepository->findOneBy(['id'=>$item_id,'TaskList'=>$taskList]);

        if(!$task){
            return $this->json(["error"=>"Task not found"], 404);
        }

        if(isset($reqBody['title'])){
            $task->setTitle($reqBody['title']);
        }

        if(isset($reqBody['tasklist_id'])){
            $taskList = $taskListRepository->findOneBy(['id'=>$reqBody['tasklist_id'],'Board'=>$board]);
            if(!$taskList){
                return $this->json(["error"=>"TaskList not found"], 404);
            }
            $task->setTaskList($taskList);
        }

        $doctrine = $doctrine->getManager();
        $doctrine->persist($task);
        $doctrine->flush();

        return $this->json(
            $taskItemSerializer->TaskItemToArray($task),
            Response::HTTP_OK
        );
    }

}
