<?php

namespace App\Controller\BoardController;

use App\Entity\Board;
use App\Repository\BoardRepository;
use App\Serializer\BoardSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CreateBoardController extends AbstractController
{
    /**
     * @Route("/api/boards", name="app_create_board", methods={"POST"})
     */
    public function index(Request $request, BoardSerializer $boardSerializer, BoardRepository $boardRepository): JsonResponse
    {

        $user = $this->getUser();

        $reqBody = $request->getContent();
        $reqBody = json_decode($reqBody, true);

        if (!isset($reqBody["title"])) {
            return $this->json(["error" => "title field is required"], 400);
        }

        if (!isset($reqBody["color"])) {
            return $this->json(["error" => "color field is required"], 400);
        }

        $board = new Board();
        $board->setTitle($reqBody["title"])
            ->setBackgroundColor($reqBody["color"])
            ->setAuthor($user)
            ->setCreated(new \DateTime())
            ->setModified(new \DateTime());

        $boardRepository->add($board, true);

        return $this->json($boardSerializer->boardToArray($board));
    }
}