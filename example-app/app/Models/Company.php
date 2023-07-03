<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'companyName',
        'companyEmail',
        'logo',
        'website',
    ];

    public function getAllCompanies(){

        return $this->all();
    }

    public function getCompanyById($companyId){

        return $this->find($companyId);
    }

    public function removeCompany()
    {
        $this->delete();
    }
}
