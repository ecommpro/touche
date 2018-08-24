// Adapted from Transform class by Simon Sarris
// https://github.com/simonsarris/Canvas-tutorials/blob/master/transform.js

export default () => {

  return {
    m: [1, 0, 0, 1, 0, 0],

    setId() {
      this.m = [1,0,0,1,0,0];
      return this;
    },

    copy(object) {
      let m = object.getMatrix();
      return this.setMatrix(m);
    },

    invert() {
      let m = this.m;
      let
        k = 1 / (m[0] * m[3] - m[1] * m[2]),
        a = m[3] * k,
        b = -m[1] * k,
        c = -m[2] * k,
        d = m[0] * k,
        e = k * (m[2] * m[5] - m[3] * m[4]),
        f = k * (m[1] * m[4] - m[0] * m[5])
      ;
      this.m = [a, b, c, d, e, f];
      return this;
    },

    inverse() {
      let m = this.m;
      let
        k = 1 / (m[0] * m[3] - m[1] * m[2]),
        a = m[3] * k,
        b = -m[1] * k,
        c = -m[2] * k,
        d = m[0] * k,
        e = k * (m[2] * m[5] - m[3] * m[4]),
        f = k * (m[1] * m[4] - m[0] * m[5])
      ;
      return new TransformationMatrix2D([a, b, c, d, e, f]);
    },

    multiply(m2) {
      let m = this.m;

      if (typeof(m2) === 'object' && !m2.length) {
        m2 = m2.getMatrix();
      }
      
      let
        a = m[0] * m2[0] + m[2] * m2[1],
        b = m[1] * m2[0] + m[3] * m2[1],
        c = m[0] * m2[2] + m[2] * m2[3],
        d = m[1] * m2[2] + m[3] * m2[3],
        e = m[0] * m2[4] + m[2] * m2[5] + m[4],
        f = m[1] * m2[4] + m[3] * m2[5] + m[5]
      ;

      this.m = [a, b, c, d, e, f];
      return this;
    },

    rotate(rad) {
      let
        m = this.m,
        cos = Math.cos(rad),
        sin = Math.sin(rad),
        a = m[0] * cos + m[2] * sin,
        b = m[1] * cos + m[3] * sin,
        c = m[0] * -sin + m[2] * cos,
        d = m[1] * -sin + m[3] * cos
      ;
      this.m[0] = a;
      this.m[1] = b;
      this.m[2] = c;
      this.m[3] = d;
      return this;
    },

    translate(x, y) {
      this.m[4] += this.m[0] * x + this.m[2] * y;
      this.m[5] += this.m[1] * x + this.m[3] * y;
      return this;
    },

    scale(sx, sy) {
      if (sy === undefined) sy = sx;

      this.m[0] *= sx;
      this.m[1] *= sx;
      this.m[2] *= sy;
      this.m[3] *= sy;
      return this;
    },

    getScaleX() {
      return Math.abs(Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]));
    },

    getScaleY() {
      return Math.abs(Math.sqrt(this.m[2] * this.m[2] + this.m[3] * this.m[3]));
    },

    getTranslationX() {
      return this.m[4];
    },

    getTranslationY() {
      return this.m[5];
    },

    setTranslation(x, y) {
      this.m[4] = x;
      this.m[5] = y;
    },

    getRotation() {
      let rad = Math.atan2(-this.m[1], this.m[0]);
      //if (rad < 0) rad += Math.PI * 2;
      return rad;

      //return Math.atan2(-this.m[2], this.m[3]);
    },

    getPositiveRotation() {
      let rotation = this.getRotation();
      return this.toPositiveAngle(rotation);
    },

    toPositiveAngle(angle)
    {
      angle = angle % (Math.PI * 2);
      if (angle < 0) angle += Math.PI * 2;
      return angle;
    },

    transformPoint(px, py) {
      let
        m = this.m,
        x = px,
        y = py
      ;

      px = x * m[0] + y * m[2] + m[4];
      py = x * m[1] + y * m[3] + m[5];

      return [px, py];
    },

    transformPointInverse(px, py) {

      let x = px, y = py, m = this.m;

      px = (m[2] * m[5] 
      - m[2] * y 
      - m[3] * m[4] 
      + m[3] * x)
      / (m[0] * m[3] - m[1] * m[2]);

      py = (-m[0] * m[5]
      + m[0] * y
      + m[1] * m[4]
      - m[1] * x) 
      / (m[0] * m[3] - m[1] * m[2]);

      return [px, py];
    },

    getMatrix() {
      let m = this.m;
      return [m[0], m[1], m[2], m[3], m[4], m[5]];
    },
    
    setMatrix(m) {
      this.m[0] = m[0];
      this.m[1] = m[1];
      this.m[2] = m[2];
      this.m[3] = m[3];
      this.m[4] = m[4];
      this.m[5] = m[5];
      return this;
    },

    getTransformations() {
      return {
        translationX: this.getTranslationX(),
        translationY: this.getTranslationY(),
        scaleX: this.getScaleX(),
        scaleY: this.getScaleY(),
        rotation: this.getRotation()
      }
    },

    fromTRS(tx, ty, r, sx, sy) {

      if (typeof(sy) === 'undefined') {
        sy = sx;
      }
      let _tx = parseFloat(tx),
        _ty = parseFloat(ty),
        _r = parseFloat(r),
        _sx = parseFloat(sx),
        _sy = parseFloat(sy)
      ;

      this.m[0] = _sx * Math.cos(_r);
      this.m[1] = -_sx * Math.sin(_r);
      this.m[2] = _sy * Math.sin(_r);
      this.m[3] = _sy * Math.cos(_r);
      this.m[4] = _tx;
      this.m[5] = _ty;
    },

    toCSS3MatrixString() {
      let m = this.m;
      return `matrix(${m[0]}, ${m[1]}, ${m[2]}, ${m[3]}, ${m[4]}, ${m[5]})`;
    }
  }
}