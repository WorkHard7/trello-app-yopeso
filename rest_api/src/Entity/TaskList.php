<?php

namespace App\Entity;

use App\Repository\TaskListRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TaskListRepository::class)
 */
class TaskList
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
     * @ORM\ManyToOne(targetEntity=Board::class, inversedBy="taskLists")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Board;

    /**
     * @ORM\OneToMany(targetEntity=TaskItem::class, mappedBy="TaskList", orphanRemoval=true)
     */
    private $taskItems;

    public function __construct()
    {
        $this->taskItems = new ArrayCollection();
    }

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

    public function getBoard(): ?Board
    {
        return $this->Board;
    }

    public function setBoard(?Board $Board): self
    {
        $this->Board = $Board;

        return $this;
    }

    /**
     * @return Collection<int, TaskItem>
     */
    public function getTaskItems(): Collection
    {
        return $this->taskItems;
    }

    public function addTaskItem(TaskItem $taskItem): self
    {
        if (!$this->taskItems->contains($taskItem)) {
            $this->taskItems[] = $taskItem;
            $taskItem->setTaskList($this);
        }

        return $this;
    }

    public function removeTaskItem(TaskItem $taskItem): self
    {
        if ($this->taskItems->removeElement($taskItem)) {
            // set the owning side to null (unless already changed)
            if ($taskItem->getTaskList() === $this) {
                $taskItem->setTaskList(null);
            }
        }

        return $this;
    }
}
