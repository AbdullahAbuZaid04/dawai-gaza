<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiTest extends TestCase
{
    public function test_governorates_endpoint(): void
    {
        $response = $this->get('/api/governorates');
        $response->assertStatus(200);
    }

    public function test_pharmacies_endpoint(): void
    {
        $response = $this->get('/api/pharmacies');
        $response->assertStatus(200);
    }

    public function test_medicines_endpoint(): void
    {
        $response = $this->get('/api/medicines');
        $response->assertStatus(200);
    }

    public function test_centers_endpoint(): void
    {
        $response = $this->get('/api/centers');
        $response->assertStatus(200);
    }

    public function test_medicines_dosage_forms_endpoint(): void
    {
        $response = $this->get('/api/medicines/dosage-forms');
        $response->assertStatus(200);
    }
}
