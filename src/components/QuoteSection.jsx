import { useState, useEffect, useRef } from 'react';
import '../css/QuoteSection.css';

const QuoteSection = () => {
  const [activeQuote, setActiveQuote] = useState(0);
  const canvasRef = useRef(null);

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      title: "Co-founder of Apple Inc."
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
      title: "Software Architect"
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
      title: "Computer Scientist"
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      author: "Martin Fowler",
      title: "Software Developer"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      title: "Co-founder of Apple Inc."
    }
  ];

  // Auto change quotes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  // RGBA Shader Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader (from document)
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;

      float sdMoon(vec2 p, float d, float ra, float rb) {
        p.y = abs(p.y);
        float a = (ra*ra - rb*rb + d*d)/(2.0*d);
        float b = sqrt(max(ra*ra-a*a,0.0));
        if(d*(p.x*b-p.y*a) > d*d*max(b-p.y,0.0))
          return length(p-vec2(a,b));
        return max((length(p)-ra), -(length(p-vec2(d,0))-rb));
      }

      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

      float cnoise(vec4 P){
        vec4 Pi0 = floor(P);
        vec4 Pi1 = Pi0 + 1.0;
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec4 Pf0 = fract(P);
        vec4 Pf1 = Pf0 - 1.0;
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = vec4(Pi0.zzzz);
        vec4 iz1 = vec4(Pi1.zzzz);
        vec4 iw0 = vec4(Pi0.wwww);
        vec4 iw1 = vec4(Pi1.wwww);

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        vec4 ixy00 = permute(ixy0 + iw0);
        vec4 ixy01 = permute(ixy0 + iw1);
        vec4 ixy10 = permute(ixy1 + iw0);
        vec4 ixy11 = permute(ixy1 + iw1);

        vec4 gx00 = ixy00 / 7.0;
        vec4 gy00 = floor(gx00) / 7.0;
        vec4 gz00 = floor(gy00) / 6.0;
        gx00 = fract(gx00) - 0.5;
        gy00 = fract(gy00) - 0.5;
        gz00 = fract(gz00) - 0.5;
        vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
        vec4 sw00 = step(gw00, vec4(0.0));
        gx00 -= sw00 * (step(0.0, gx00) - 0.5);
        gy00 -= sw00 * (step(0.0, gy00) - 0.5);

        vec4 gx01 = ixy01 / 7.0;
        vec4 gy01 = floor(gx01) / 7.0;
        vec4 gz01 = floor(gy01) / 6.0;
        gx01 = fract(gx01) - 0.5;
        gy01 = fract(gy01) - 0.5;
        gz01 = fract(gz01) - 0.5;
        vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
        vec4 sw01 = step(gw01, vec4(0.0));
        gx01 -= sw01 * (step(0.0, gx01) - 0.5);
        gy01 -= sw01 * (step(0.0, gy01) - 0.5);

        vec4 gx10 = ixy10 / 7.0;
        vec4 gy10 = floor(gx10) / 7.0;
        vec4 gz10 = floor(gy10) / 6.0;
        gx10 = fract(gx10) - 0.5;
        gy10 = fract(gy10) - 0.5;
        gz10 = fract(gz10) - 0.5;
        vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
        vec4 sw10 = step(gw10, vec4(0.0));
        gx10 -= sw10 * (step(0.0, gx10) - 0.5);
        gy10 -= sw10 * (step(0.0, gy10) - 0.5);

        vec4 gx11 = ixy11 / 7.0;
        vec4 gy11 = floor(gx11) / 7.0;
        vec4 gz11 = floor(gy11) / 6.0;
        gx11 = fract(gx11) - 0.5;
        gy11 = fract(gy11) - 0.5;
        gz11 = fract(gz11) - 0.5;
        vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
        vec4 sw11 = step(gw11, vec4(0.0));
        gx11 -= sw11 * (step(0.0, gx11) - 0.5);
        gy11 -= sw11 * (step(0.0, gy11) - 0.5);

        vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
        vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
        vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
        vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
        vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
        vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
        vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
        vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
        vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
        vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
        vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
        vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
        vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
        vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
        vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
        vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

        vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
        g0000 *= norm00.x;
        g0100 *= norm00.y;
        g1000 *= norm00.z;
        g1100 *= norm00.w;

        vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
        g0001 *= norm01.x;
        g0101 *= norm01.y;
        g1001 *= norm01.z;
        g1101 *= norm01.w;

        vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
        g0010 *= norm10.x;
        g0110 *= norm10.y;
        g1010 *= norm10.z;
        g1110 *= norm10.w;

        vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
        g0011 *= norm11.x;
        g0111 *= norm11.y;
        g1011 *= norm11.z;
        g1111 *= norm11.w;

        float n0000 = dot(g0000, Pf0);
        float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
        float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
        float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
        float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
        float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
        float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
        float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
        float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
        float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
        float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
        float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
        float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
        float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
        float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
        float n1111 = dot(g1111, Pf1);

        vec4 fade_xyzw = fade(Pf0);
        vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
        vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
        vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
        vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
        float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
        return 2.2 * n_xyzw;
      }

      vec2 grid(vec2 uv) {
        return floor(uv * 50.0) * 0.02;
      }

      vec3 getColor(vec2 uv, float d, float n) {
        vec3 fgColor = vec3(0.16, 0.53, 0.37);
        vec3 fgColor2 = vec3(0.16, 0.13, 0.57);
        vec3 bgColor = vec3(0.1, 0.1, 0.22);
        
        if (d < 0.1 && n < 0.1) {
          float mx = mod(uv.x, 0.04);
          float my = mod(uv.y, 0.04);
          return mix(fgColor, bgColor, step(0.02, min(mx, my)));
        }
        
        if (d < 0.1) {
          return fgColor;
        }
        
        if (n < 0.1) {
          float mx = mod(uv.x, 0.04);
          float my = mod(uv.y, 0.04);
          return mix(bgColor, fgColor2, step(0.02, min(mx, my)));
        }
        
        return bgColor;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;
        uv.y *= resolution.y / resolution.x;
        
        vec2 ruv = uv;
        float PI = 3.14159;
        float sectors = 8.0;
        float halfSector = sectors * 0.5;
        
        float angle = atan(uv.y, uv.x);
        angle = abs(mod(angle, PI / halfSector) - PI / sectors);
        
        float d = 1.0;
        float ra = 0.7;
        float rb = 0.6;
        float di = 1.5;
        
        float noiseAmount = 0.5;
        float noiseFrequency = 3.0;
        float n = cnoise(vec4(noiseFrequency * grid(uv), noiseFrequency * grid(uv).x, time)) * noiseAmount;
        
        vec2 guv = floor(ruv * 50.0) * 0.02;
        
        d = min(d, sdMoon(2.0 * guv + vec2(cos(-time), sin(-time)), di * sin(-time), ra, rb));
        d = smoothstep(0.0, 0.01, d);
        n = smoothstep(0.0, 0.01, n);

        vec3 color = getColor(ruv, d, n);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shaders
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');

    // Animation loop
    let startTime = Date.now();
    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleDotClick = (index) => {
    setActiveQuote(index);
  };

  return (
    <section id="quotes" className="quote-section">
      <canvas ref={canvasRef} className="quote-canvas"></canvas>
      
      <div className="quote-overlay"></div>
      
      <div className="quote-container">
        <div className="quote-content">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`quote-item ${index === activeQuote ? 'active' : ''}`}
            >
              <div className="quote-mark-open">"</div>
              <p className="quote-text">{quote.text}</p>
              <div className="quote-mark-close">"</div>
              <div className="quote-author">
                <span className="author-name">— {quote.author}</span>
                <span className="author-title">{quote.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="quote-dots">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeQuote ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;