 uniform float uTime;
 uniform float uSize;

 attribute float aScale;

 varying vec3 vColor;
 
 void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            /**
            * Spin
            */
            float angle = atan(modelPosition.x, modelPosition.z);
            float distanceCenter = length(modelPosition.xz);
            float angleOffset = (1.0 / distanceCenter) * uTime * 0.2;
            angle += angleOffset;
            modelPosition.x = cos(angle) * distanceCenter;
            // modelPosition.y = sin(angle); potential background
            modelPosition.z = sin(angle) * distanceCenter;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

            gl_PointSize = uSize * aScale;
            gl_PointSize *= (1.0 /  - viewPosition.z);

            vColor = color;
        }