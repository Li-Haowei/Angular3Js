import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, AfterViewInit {
  //ViewChild is a property decorator that configures a view query. The change detector looks for the 
  //first element or the ddirective matching the selector in the view DOM. If the view DOM changes, 
  //and a new child matches the selector, the property is updated
  //https://angular.io/api/core/ViewChild
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  //* Cube Properties

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  @Input() public texture: string = "/assets/earth.jpeg"; //This is for texture mapping


  //* Stage Properties, 
  // referring to /assets/camera_view.png

  @Input() public cameraZ: number = 600; //Camera position on the z-axis

  @Input() public fieldOfView: number = 1; //zoom control, higher the further

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000; //This is the background, black canvas

  //? Helper Properties (Private Properties);

  private camera!: THREE.PerspectiveCamera; //It defines a frustum, feeling of distance in 3d views

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loader = new THREE.TextureLoader();
//Geometry is what defines the shape, and there are other basic predefined option
//Look at assets/options.jpeg
  //private geometry = new THREE.BoxGeometry(1, 1, 1);
  private geometry = new THREE.SphereGeometry(1.5, 32, 32);
//This is what loads the texture, and it can load color like:
/*new THREE.MeshBasicMaterial({
  color: 0xFF8001
})*/
  private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  /**
   *Animate the cube
   *and positioning a Mesh
   * @private
   * @memberof CubeComponent
   */
  private animateCube() {
    this.cube.position.set(2,0,0);
    //this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the scene
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    this.scene.add(this.cube);
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    //recursive render function to generate the animation loop
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  constructor() { }

  ngOnInit(): void {

  }
  //finally, create scene
  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

}
