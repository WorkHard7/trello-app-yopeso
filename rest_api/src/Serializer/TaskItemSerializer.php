<?php

namespace App\Serializer;

use App\Entity\TaskItem;

class TaskItemSerializer
{
    public function TaskItemToArray(TaskItem $taskItem){
        return [
            'id'=>$taskItem->getId(),
            'title'=>$taskItem->getTitle(),
            'tasklist_id'=>$taskItem->getTaskList()->getId()
        ];
    }

}