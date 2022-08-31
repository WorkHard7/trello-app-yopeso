<?php

namespace App\Controller\BoardController;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class GetBoardListingController extends AbstractController
{
    /**
     * @Route("/boards/{user_id}",
     *      requirements={"userId"="\d+"},
     *      name="app_get_board_listing",
     *     methods={"GET"})
     */
    public function index(): Response
    {
        return $this->json([
            'name' => 'get board controller',
            'method' => 'GET'
        ]);
    }
}
