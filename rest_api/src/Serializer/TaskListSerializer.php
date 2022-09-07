<?php

namespace App\Serializer;

use App\Entity\TaskList;
use App\Serializer\TaskItemSerializer;

class TaskListSerializer
{
    public function TaskListToArray(TaskList $taskList){
        $taskItemSerializer = new TaskItemSerializer();
        $taskItems = $taskList->getTaskItems();
        $tasks = [];
        foreach($taskItems as $task){
            $tasks[] = $taskItemSerializer->TaskItemToArray($task);
        }
        return [
            'id' => $taskList->getId(),
            'title' => $taskList->getTitle(),
            'board_id'=> $taskList->getBoard()->getId(),
            'tasks' => $tasks
        ];
    }
}