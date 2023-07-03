<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'fName',
        'lName',
        'email',
        'phone',
    ];

    public function getAllEmployees(){

        return $this->all();
    }

    public function getEmployeeById($employeeId){

        return $this->find($employeeId);
    }

    public function removeEmployee()
    {
        $this->delete();
    }
}
