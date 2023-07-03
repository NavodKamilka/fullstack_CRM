<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Route::post('login', 'UserController@login');
Route::post('login',[UserController::class,'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//company
Route::middleware('auth:sanctum')->post('/company/add', [CompanyController::class, 'addCompany']);
Route::middleware('auth:sanctum')->get('/company/getAll', [CompanyController::class, 'getAll']);
Route::middleware('auth:sanctum')->get('/company/getCompanyById/{id}', [CompanyController::class, 'getCompanyById']);
Route::middleware('auth:sanctum')->delete('/company/delete/{id}', [CompanyController::class, 'removeCompany']);
Route::middleware('auth:sanctum')->put('/company/updateCompany/{id}', [CompanyController::class, 'updateCompany']);

//Employee
Route::middleware('auth:sanctum')->post('/employee/add', [EmployeeController::class, 'addEmployee']);
Route::middleware('auth:sanctum')->get('/employee/getAll', [EmployeeController::class, 'getAll']);
Route::middleware('auth:sanctum')->get('/employee/getEmployeeById/{id}', [EmployeeController::class, 'getEmployeeById']);
Route::middleware('auth:sanctum')->delete('/employee/delete/{id}', [EmployeeController::class, 'removeEmployee']);
Route::middleware('auth:sanctum')->put('/employee/updateEmployee/{id}', [EmployeeController::class, 'updateEmployee']);


// Route::middleware('web')->group(function () {
//     // Your routes here
//     Route::post('login',[UserController::class,'login']);
// });



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
