<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Log;
use Validator;
use App\Http\Resources\LogResource;

class LogController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $entities = Log::all();

        return $this->sendResponse(LogResource::collection($entities), 'Logs retrieved successfully.');
    }

}
