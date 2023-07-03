<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function addCompany(Request $request)
    {
        $request->validate([
            'companyName' => 'required|string',
            'companyEmail' => 'required|email',
            'logo' => 'required|string',
            'website' => 'required|url',
        ]);

        //$logoPath = $request->file('logo')->store('company-logos', 'public');

        $company = Company::create([
            'companyName' => $request->input('companyName'),
            'companyEmail' => $request->input('companyEmail'),
            'logo' => $request->input('logo'),
            'website' => $request->input('website'),
        ]);

        return response()->json(['message' => 'Company added successfully', 'company' => $company]);
    }

    public function getAll(){

        $companyModel = new Company;
        //$companies = Company::paginate(10);
        $companies = $companyModel->getAllCompanies(); 

        return response()->json($companies, 200);

    }

    public function getCompanyById($id){

        $company = Company::find($id);

        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        return response()->json($company, 200);
    }

    public function removeCompany($id){
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], Response::HTTP_NOT_FOUND);
        }

        $company->delete();

        return response()->json(['message' => 'Company removed successfully']);
       
    }

    public function updateCompany(Request $request, $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'companyName' => 'required|string',
            'companyEmail' => 'required|email',
            'logo' => 'required|string',
            'website' => 'required|string',
        ]);

        $company->companyName = $request->input('companyName');
        $company->companyEmail = $request->input('companyEmail');
        $company->logo = $request->input('logo');
        $company->website = $request->input('website');
        $company->save();

        return response()->json(['message' => 'Company updated successfully', 'company' => $company]);
    }
}
