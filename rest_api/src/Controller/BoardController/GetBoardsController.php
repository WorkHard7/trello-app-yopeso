<?php

namespace App\Controller\BoardController;

use App\Entity\User;
use App\Repository\BoardRepository;
use App\Serializer\BoardSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetBoardsController extends AbstractController
{
    /**
     * @Route("/api/boards",
     *      name="app_get_boards",
     *     methods={"GET"})
     */
    public function index(
        BoardRepository $boardRepository,
        boardSerializer $boardSerializer
    ): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json('User not authenticated', Response::HTTP_UNAUTHORIZED);
        }
        $boards = $boardRepository->findBy(['author' => $user]);
        if (!$boards) {
            return $this->json([]);
        }
        $results = [];
        foreach ($boards as $item) {
            $results[] = $boardSerializer->boardToArray($item);
        }
        return $this->json(
            $results, Response::HTTP_OK
        );
    }

}
