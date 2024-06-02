import { AsyncPipe, NgIf } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeServiceService } from './fake.service';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @for (menu of menus(); track $index) {
      <a
        class="rounded-md border px-4 py-2"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
        {{ menu.name }}
      </a>
    }
  `,
  styles: [
    `
      a.isSelected {
        @apply bg-gray-600 text-white;
      }
    `,
  ],
  host: {
    class: 'flex flex-col p-2 gap-2',
  },
})
export class NavigationComponent {
  menus = input.required<MenuItem[]>();
}

@Component({
  standalone: true,
  imports: [NavigationComponent, NgIf, AsyncPipe],
  template: `
    <app-nav [menus]="menus()" />
  `,
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);

  readonly info = this.fakeBackend.getInfoFromBackend();
  readonly menus = computed(() => this.getMenu(this.info() || ''));

  getMenu(prop: string) {
    return [
      { path: '/foo', name: `Foo ${prop}` },
      { path: '/bar', name: `Bar ${prop}` },
    ];
  }
}
