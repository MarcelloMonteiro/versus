<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client' => $this->client,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'products' => $this->products->map(function($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'amount' => $product->pivot->amount,
                    'price' => $product->pivot->price,
                ];
            }),
            '_links' => [
                'self' => route('orders.show', $this->id),
                'update_status' => route('orders.updateStatus', $this->id),
                'all_orders' => route('orders.index'),
            ],
        ];
    }
}
