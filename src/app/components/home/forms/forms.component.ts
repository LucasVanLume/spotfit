import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { GetLocationsService } from 'src/app/services/get-locations.service';
import { Location } from 'src/app/interfaces/location.interface';

export interface Uf {
  name: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  results: Location[] = [];
  formGroup!: FormGroup;

  options: Uf[] = [{name: 'PE'}, {name: 'SP'}, {name: 'RJ'}];
  filteredOptions!: Observable<Uf[]>;

  constructor(private formBuilder: FormBuilder, private getLocationsService: GetLocationsService) { }

  ngOnInit() {
    this.getLocationsService.getAllLocations().subscribe(data => {
      this.results = data.locations;
      console.log(data);
    });

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false,
      hasTowel: false,
      hasFountain: false,
      hasLocker: false,
      uf: '',
    });

    this.filteredOptions = this.formGroup.get('uf')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  onClean() {
    this.formGroup.reset();
  }

  displayFn(uf: Uf): string {
    return uf && uf.name ? uf.name : '';
  }

  private _filter(name: string): Uf[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
