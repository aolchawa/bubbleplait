import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        // MatCardModule,
        // MatTableModule,
        // MatPaginatorModule,
        MatSlideToggleModule,
        // MatProgressSpinnerModule,
        // MatDialogModule,
        // MatExpansionModule,
        // MatGridListModule,
        MatSelectModule
    ],
    exports: [
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        // MatCardModule,
        // MatTableModule,
        // MatPaginatorModule,
        MatSlideToggleModule,
        // MatProgressSpinnerModule,
        // MatDialogModule,
        // MatExpansionModule,
        // MatGridListModule,
        MatSelectModule
    ]
})
export class MaterialModule { }