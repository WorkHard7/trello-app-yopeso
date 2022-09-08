<?php

namespace App\Entity;

use App\Repository\TaskItemRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TaskItemRepository::class)
 */
class TaskItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=TaskList::class, inversedBy="taskItems")
     * @ORM\JoinColumn(nullable=false)
     */
    private $TaskList;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getTaskList(): ?TaskList
    {
        return $this->TaskList;
    }

    public function setTaskList(?TaskList $TaskList): self
    {
        $this->TaskList = $TaskList;

        return $this;
    }
}
