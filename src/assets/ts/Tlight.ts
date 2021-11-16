import { AmbientLight, Object3D, PointLight } from "three"

export const LightsList:Object3D[]=[]

    //添加环境光
    const ambientLight : AmbientLight = new AmbientLight(0x00ffff);
    // this.scene.add(ambientLight);
    // 添加点光源
    const pointlight:PointLight = new PointLight( 0xffffff, 5, 100 );
    pointlight.position.set( 50, 50, 50 );
    // this.scene.add( pointlight );

LightsList.push(ambientLight);
LightsList.push(pointlight);