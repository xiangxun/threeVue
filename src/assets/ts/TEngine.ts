import { AmbientLight, Box3, BoxBufferGeometry, LoadingManager, Mesh, MeshLambertMaterial, MeshStandardMaterial, MOUSE, PerspectiveCamera, PointLight, Scene, SphereGeometry, TextureLoader, Vector3, WebGLCubeRenderTarget, WebGLRenderer } from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export class TEngine{

    private dom:HTMLElement
    private renderer:WebGLRenderer
    private scene:Scene
    private camera:PerspectiveCamera
    private loader:TextureLoader
    // private controls:OrbitControls

    constructor(dom:HTMLElement){
        this.dom = dom
        this.renderer = new WebGLRenderer()
        // 新建场景
        this.scene = new Scene()
        // 新建透视相机
        this.camera = new PerspectiveCamera(45,dom.offsetWidth/dom.offsetHeight,0.1,1000);
        // this.camera.position.set(20,20,20);
        this.camera.lookAt(new Vector3(0,0,0));

        // 3D背景
        this.loader = new TextureLoader();
        const texture = this.loader.load(
        //   'https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
        // '/loader/hdr/hilly.jpg',
            'https://i.loli.net/2021/11/09/bdgf4T5D1siRpvK.jpg',
          () => {
            const rt = new WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(this.renderer, texture);
            this.scene.background = rt.texture;
          });



          let sceneReady=false
          const loadingManager=new LoadingManager(
              //loaded 载入完成
              ()=>{
                  console.log("载入完成")
                  sceneReady=true
                  console.log("scene===",this.scene)
              },
              //Progress 载入过程
              
              (itemUrl, itemsLoaded, itemsTotal) => {
                  console.log("载入中...", itemsLoaded)
              }
          
          )
          
          
          const dracoLoader=new DRACOLoader()
<<<<<<< HEAD
          dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
=======
          dracoLoader.setDecoderPath('./src/loader/draco/')
>>>>>>> 236c4fe4ed2183a749a6260d07da6bcbf92b9816
          
          const gltfLoader=new GLTFLoader(loadingManager)
          gltfLoader.setDRACOLoader(dracoLoader)
          gltfLoader.load(
              './src/loader/dracoModel/dracoRoom.gltf',
            //   '../loader/dracoModel/dracoRoom.gltf',
              (gltf)=>{
                  const object =gltf.scene || gltf.scene[0]
          
                  //1.调整物体位置
                  const box = new Box3().setFromObject(object)
                  const size = box.getSize(new Vector3()).length()
                  const center = box.getCenter(new Vector3())
                  object.position.x += (object.position.x - center.x);
                  object.position.y += (object.position.y - center.y);
                  object.position.z += (object.position.z - center.z);
                  //2.调整相机位置
                  this.camera.near = size / 100
                  this.camera.far = size * 100
                  this.camera.updateProjectionMatrix()
          
                  this.camera.position.copy(center)
                  this.camera.position.x += size/2.0
                  this.camera.position.y += size/2.0
                  this.camera.position.z += size/2.0
                  this.camera.lookAt(center)
          
                  this.scene.add(object)
                  console.log("scene===",this.scene);
          
              }
          )









        //设置轨道控制
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        const orbitControls:OrbitControls = new OrbitControls(this.camera, this.renderer.domElement)
        //设置鼠标键位
        orbitControls.mouseButtons = {
            // LEFT: null as unknown as MOUSE,
            LEFT:MOUSE.ROTATE,
            MIDDLE: MOUSE.PAN,
            RIGHT:MOUSE.ROTATE,
        }


        console.log(dom)
        dom.appendChild(this.renderer.domElement)
        this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)

        //添加环境光
        const ambientLight : AmbientLight = new AmbientLight(0x00ffff);
        this.scene.add(ambientLight);
        // 添加点光源
        const pointlight:PointLight = new PointLight( 0xffffff, 5, 100 );
        pointlight.position.set( 50, 50, 50 );
        this.scene.add( pointlight );

        // 设置几何体
        // const box:Mesh = new Mesh(
        //     new BoxBufferGeometry(10,10,10),
        //     new MeshStandardMaterial({color:0xffff00})
        // )
        // this.scene.add(box);
        // const geometry = new SphereGeometry( 6, 32, 16 );
        // const material = new MeshLambertMaterial( { color: 0xffffee } );
        // const sphere = new Mesh( geometry, material );
        // this.scene.add( sphere );

        //设置性能监视器
        const stats = Stats()
        // const statsDom = stats.domElement
        // dom.appendChild(statsDom);
        dom.appendChild(stats.domElement)

        // this.renderer.setClearColor('rgb(255,255,255)')
        // this.renderer.clearColor();

        //设置动画
        const renderFun =() =>{
            console.log(1)
            this.renderer.render(this.scene, this.camera)
            stats.update();
            requestAnimationFrame(renderFun)
        }

        renderFun();

        dom.appendChild(this.renderer.domElement)
        // this.controls.update();
        
    }
}
