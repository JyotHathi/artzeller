import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css'],
})
export class ConnectionsComponent implements OnInit {
  //#region GLOBAL VARIABLES
  _title = 'Connections';
  _pageDescription =
    'You can use connections to define how JSON2Video integrates with other systems and platforms. For example, you can automatically push the rendered video to your own SFTP server or call a webhook.';
  _showPassword = false;
  _editConnectionForm!: FormGroup;
  _addConnectionForm!: FormGroup;
  _currentConnection: any;

  // state management
  loading = true; // State to control loader visibility
  _connectionTypes = ['Webhook', 'FTP', 'SFTP'];
  _connections: any[] | undefined;

  //#endregion GLOBAL VARIABLES

  //#region COMPONENT METHODS
  constructor(
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder //protected deleteDialogRef: NbDialogRef<ConnectionsComponent>
  ) {}

  ngOnInit(): void {
    /** COMPONENT INITIALIZATION METHOD */
    this.getConnectionDetails(); // fetch all connection data
    this.loading = false;
    this.toggleLoadingAnimation();
    this.initForm();
  }

  //#endregion COMPONENT METHODS

  //#region FUNCTIONS

  getConnectionDetails() {
    try {
      // fetch data from API for all the connections and set the data array
      this._connections = [
        {
          id: 1,
          type: 'any',
          connectionID: 'Connection 1',
          host: 'host1.com',
          username: 'user1',
          port: 22,
          remotePath: '/example/path1',
          fileType: 'Type1',
        },
        {
          id: 2,
          type: 'any',
          connectionID: 'Connection 2',
          host: 'host1.com',
          username: 'user1',
          port: 22,
          remotePath: '/example/path1',
          fileType: 'Type1',
        },
        {
          id: 3,
          type: 'any',
          connectionID: 'Connection 3',
          host: 'host1.com',
          username: 'user1',
          port: 22,
          remotePath: '/example/path1',
          fileType: 'Type1',
        },
        {
          id: 4,
          type: 'any',
          connectionID: 'Connection 4',
          host: 'host1.com',
          username: 'user1',
          port: 22,
          remotePath: '/example/path1',
          fileType: 'Type1',
        },
      ];
    } catch (error) {
      console.log('error occurred on getConnectionDetails ->', error);
    }
  }
  initForm() {
    // initialize edit connection form
    this._editConnectionForm = this.formBuilder.group({
      id: [],
      type: ['', Validators.required],
      connectionID: ['', Validators.required],
      host: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      port: ['', Validators.required],
      remotePath: [''],
      fileType: [''], // or whatever controls you need
    });

    // initialize add connection form
    this._addConnectionForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => (this.loading = false), 2000);
  }

  @ViewChild('addConnectionDialog')
  addConnectionDialog!: TemplateRef<any>;
  addConnectionDialogRef: NbDialogRef<any> | undefined;
  openAddNewConnectionDialog() {
    this.addConnectionDialogRef = this.dialogService.open(
      this.addConnectionDialog,
      {
        context: {},
      }
    );
  }

  addNewConnection() {
    try {
      if (this._addConnectionForm.valid) {
        const newConnection = {
          id: this._connections?.length || 0 + 1,
          type: this._addConnectionForm.value.type,
          connectionID: this._addConnectionForm.value.name,
          host: 'sample.host.name',
          username: 'sampleusername',
          password: '123',
          port: 12,
          remotePath: 'sampleremotepath',
          fileType: 'file type sample',
        };

        this._connections?.push(newConnection); // Add the new connection
        this._addConnectionForm.reset(); // Reset form after submission
        this.addConnectionDialogRef?.close(); // close add model popup
      }
    } catch (error) {
      console.log('error occurred on addNewConnection ->', error);
    }
  }

  cancelAddNewConnection() {
    try {
      if (this.addConnectionDialogRef) {
        this.addConnectionDialogRef.close();
      }
    } catch (error) {
      console.log('error occurred on cancelAddNewConnection ->', error);
    }
  }

  @ViewChild('deleteConfirmationDialog')
  deleteConfirmationDialog!: TemplateRef<any>;
  deleteDialogRef: NbDialogRef<any> | undefined;
  openDeleteDialog(connection: any) {
    try {
      if (connection) {
        this._currentConnection = connection; // set connection object on delete button click
      }
      if (this._currentConnection && this._currentConnection.id) {
        // if connection id is valid then proceed to delete
        console.log('on delete icon click ---', this._currentConnection);
        this.deleteDialogRef = this.dialogService.open(
          this.deleteConfirmationDialog,
          {
            context: {
              title: 'Delete Confirmation',
            },
          }
        );
      }
    } catch (error) {
      console.log('error occurred on openDeleteDialog ->', error);
    }
  }

  deleteConnection() {
    try {
      if (this.deleteDialogRef) {
        if (this._currentConnection && this._currentConnection.id) {
          // business logic to delete the connection
          this._connections = this._connections?.filter(
            (connection) => connection.id !== this._currentConnection.id
          );
          this._currentConnection = null;
          this.deleteDialogRef.close(); // close delete confirmation
          if (this.editDialogRef) {
            this.editDialogRef.close(); // close edit model
          }
        }
      }
    } catch (error) {
      console.log('error occurred on deleteConnection ->', error);
    }
  }

  cancelDeleteConfirmation() {
    if (this.deleteDialogRef) {
      this.deleteDialogRef.close(); // close delete confirmation in case of cancel button click
    }
  }

  @ViewChild('editConnectionDialog')
  editConnectionDialog!: TemplateRef<any>;
  editDialogRef: NbDialogRef<any> | undefined;
  openEditConnectionModal(connection: any) {
    try {
      this._currentConnection = connection; // set connection object

      // set data for editing
      this._editConnectionForm.patchValue({
        id: connection.id,
        type: connection.type,
        connectionID: connection.connectionID,
        host: connection.host,
        username: connection.username,
        password: connection.password,
        port: connection.port,
        remotePath: connection.remotePath,
        fileType: connection.fileType,
      });

      // open edit model popup
      this.editDialogRef = this.dialogService.open(this.editConnectionDialog, {
        context: {},
      });
    } catch (error) {
      console.log('error occurred on openEditConnectionModal ->', error);
    }
  }

  updateConnectionDetails() {
    try {
      const updatedConnection = this._editConnectionForm.value;
      if (this.editDialogRef) {
        this.editDialogRef.close(); // close edit model popup
      }
    } catch (error) {
      console.log('error occurred on updateConnectionDetails ->', error);
    }
  }

  cancelEditConnection() {
    if (this.editDialogRef) {
      this.editDialogRef.close();
    }
  }

  getInputType() {
    if (this._showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this._showPassword = !this._showPassword;
  }

  //#endregion FUNCTIONS
}
