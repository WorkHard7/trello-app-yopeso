<?php

namespace App\Serializer;

use App\Entity\Board;

class BoardSerializer
{
    public function boardToArray(Board $board): array
    {
        return [
            'id' => $board->getId(),
            'title' => $board->getTitle(),
            'background_color' => $board->getBackgroundColor(),
            'author_id' => $board->getAuthor()->getId(),
            'created' => $board->getCreated()->getTimestamp(),
            'modified' => $board->getModified()->getTimestamp()
        ];
    }
}