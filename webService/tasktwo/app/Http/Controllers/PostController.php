<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class PostController extends Controller
{
    // public
    public function index()
    {
        $posts = Post::all();
        return response()->json(
            [
                "success" => true,
                "data" => $posts,
                "message" => "posts :",
            ],
            200,
        );
    }

    // protected
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required|min:5",
            "content" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    "success" => false,
                    "message" => "validation failed",
                    "errors" => $validator->errors(),
                ],
                422,
            );
        }

        $post = Post::create([
            ...$validator->validated(),
            "user_id" => Auth::id(),
        ]);

        return response()->json(
            [
                "success" => true,
                "data" => $post,
                "message" => "Post created",
            ],
            201,
        );
    }

    // public
    public function show($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(
                ["success" => false, "message" => "not found"],
                404,
            );
        }

        return response()->json(
            ["success" => true, "data" => $post, "message" => "post :"],
            200,
        );
    }

    // protected
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(
                ["success" => false, "message" => "not found"],
                404,
            );
        }

        if ($post->user_id !== auth()->id()) {
            return response()->json(
                ["success" => false, "message" => "Forbidden"],
                403,
            );
        }

        $post->update($request->all());
        return response()->json(
            [
                "success" => true,
                "data" => $post,
                "message" => "Post updated successfully",
            ],
            200,
        );
    }

    // protected
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(
                ["success" => false, "message" => "Post Not Found"],
                404,
            );
        }

        if ($post->user_id !== auth()->id()) {
            return response()->json(
                ["success" => false, "message" => "Forbidden"],
                403,
            );
        }

        $post->delete();
        return response()->json(
            [
                "success" => true,
                "data" => null,
                "message" => "Post deleted successfully",
            ],
            200,
        );
    }
}
