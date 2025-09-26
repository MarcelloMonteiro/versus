<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ProcessOrderJob;
use App\Models\Order;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::with('products')->get();
        return OrderResource::collection($orders);
    }
    
    public function store(Request $request)
    {
        $order = Order::create([
            'client' => $request->client,
            'status' => 'pending'
        ]);

        foreach ($request->products as $item) {
            $order->products()->attach($item['id'], [
                'amount' => $item['amount'],
                'price' => $item['price']
            ]);
        }

        ProcessOrderJob::dispatch($order);

        return new OrderResource($order);
    }

    public function show($id)
    {
        $order = Order::with('products')->findOrFail($id);
        return new OrderResource($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return new OrderResource($order);
    }
}
