import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]), // refuses to save as 'username'
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails.bind(this)
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupForm.setValue({
      userData: {
        username: 'Veena',
        email: 'Veena@gmail.com',
      },
      gender: 'female',
      hobbies: [],
    });
    this.signupForm.patchValue({
      userData: {
        username: 'Regina',
      },
    });
  }

  onSubmit(): void {
    console.log(this.signupForm);
    // this.signupForm.reset()
    this.signupForm.reset({
      userData: {
        username: '',
        email: '',
      },
      gender: 'male',
      hobbies: [],
    });
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  //   getControls() {
  //     return (<FormArray>this.signupForm.get('hobbies')).controls;
  //   }
}
