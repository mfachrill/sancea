<?php

namespace Tests\Feature;

use Tests\TestCase;

class ShowroomTest extends TestCase
{
    public function test_showroom_routes_support_direct_visits_and_refreshes(): void
    {
        $this->withoutVite();

        foreach (['/', '/katalog', '/produk/kebaya-contoh', '/admin'] as $path) {
            $this->get($path)->assertOk()->assertViewIs('app')->assertSee('id="app"', false);
        }
    }

    public function test_unknown_routes_return_not_found(): void
    {
        $this->get('/halaman-tidak-ada')->assertNotFound();
    }
}
