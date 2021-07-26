<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:255|confirmed',
            'password_confirmation' => 'required|string|min:8|max:255',
        ];
    }

    // public function messages(): array
    // {
    //     return [
    //         'name.required' => 'nameは必須項目です',
    //         'name.required' => 'nameは必須項目です',
    //         'email.required' => 'emailは必須項目です',
    //         'password.required' => 'passwordは必須項目です',
    //     ];
    // }

    // protected function failedValidation(Validator $validator): void
    // {
    //     $response['status']  = 'NG';
    //     $response['summary'] = 'Failed validation.';
    //     $response['errors']  = $validator->errors()->toArray();

    //     throw new HttpResponseException(
    //         response()->json($response, 422)
    //     );
    // }
}