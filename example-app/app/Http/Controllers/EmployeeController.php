<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function addEmployee(Request $request)
    {
        $request->validate([
            'company_id' => 'required|integer',
            'fName' => 'required|string',
            'lName' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        $employee = Employee::create([
            'company_id' => $request->input('company_id'),
            'fName' => $request->input('fName'),
            'lName' => $request->input('lName'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
        ]);

        return response()->json(['message' => 'Employee created successfully', 'employee' => $employee]);
    }

    public function getAll(){

        $employeeModel = new Employee;
        $employees = $employeeModel->getAllEmployees(); 

        return response()->json($employees, 200);

    }

    public function getEmployeeById($id){

        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['error' => 'Employee not found'], 404);
        }

        return response()->json($employee, 200);
    }

    public function removeEmployee($id){
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], Response::HTTP_NOT_FOUND);
        }

        $employee->delete();

        return response()->json(['message' => 'Employee removed successfully']);
       
    }

    public function updateEmployee(Request $request, $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'company_id' => 'required|integer',
            'fName' => 'required|string',
            'lName' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        $employee->company_id = $request->input('company_id');
        $employee->fName = $request->input('fName');
        $employee->lName = $request->input('lName');
        $employee->email = $request->input('email');
        $employee->phone = $request->input('phone');
        $employee->save();

        return response()->json(['message' => 'Employee updated successfully', 'Employee' => $employee]);
    }
}

