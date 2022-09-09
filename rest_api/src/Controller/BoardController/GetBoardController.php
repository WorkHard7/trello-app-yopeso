<?php

namespace App\Controller\BoardController;

use App\Entity\User;
use App\Repository\BoardRepository;
use App\Serializer\BoardSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetBoardController extends AbstractController
{
    /**
     * @Route("/api/boards/{board_id}",
     *      name="app_get_board",
     *      requirements={"board_id"="\d+"},
     *     methods={"GET"})
     */
    public function index(
        int             $board_id,
        BoardRepository $boardRepository,
        boardSerializer $boardSerializer
    ): Response
    {
        $user = $this->getUser();

        $board = $boardRepository->findOneBy(['author' => $user,'id'=>$board_id]);

        if(!$board){
            return $this->json(["error"=>"Board not found"],404);
        }

        return $this->json(
            $boardSerializer->boardToArray($board), Response::HTTP_OK
        );
    }

}
