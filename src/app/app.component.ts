import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './custom.scss']
})
export class AppComponent {
  title = 'tech-assign';
  public res : any;
  registerForm: FormGroup;
    submitted = false;
  constructor(private config: ConfigService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required, Validators.pattern('^[a-zA-Z \-\']+')],
      lastName: ['', Validators.required, Validators.pattern('^[a-zA-Z \-\']+')],
      class: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.minLength(6)]],
      percentage: [Validators.required]
  });
    this.config.getData()
      .subscribe(data => {
        console.log(data);
        this.res= data;
      });
  }

   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;

       if (this.registerForm.invalid) {
           return;
       }

       alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
   }

   
}
