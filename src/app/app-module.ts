import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Class0 } from './class0/class0.component';
import { FormsModule } from '@angular/forms';

import { Class2Component } from './class2/components/class2/class2.component';
import { BadgeComponent } from './class2/components/badge/badge.component';
import { TodoListComponent } from './class2/components/todo-list/todo-list.component';
import { StatsComponent } from './class2/components/stats/stats.component';

@NgModule({
  declarations: [App, Class0, BadgeComponent, Class2Component, TodoListComponent, StatsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
