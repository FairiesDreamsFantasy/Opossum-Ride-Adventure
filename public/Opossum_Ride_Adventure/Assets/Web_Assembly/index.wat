(module
  (func $calculate_force (param $mass f32) (param $accel f32) (result f32)
    local.get $mass
    local.get $accel
    f32.mul)
  (func $calculate_velocity (param $v0 f32) (param $accel f32) (param $time f32) (result f32)
    local.get $v0
    local.get $accel
    local.get $time
    f32.mul
    f32.add)
  (func $calculate_distance (param $v0 f32) (param $time f32) (param $accel f32) (result f32)
    local.get $v0
    local.get $time
    f32.mul
    local.get $accel
    local.get $time
    local.get $time
    f32.mul
    f32.mul
    f32.const 0.5
    f32.mul
    f32.add)
  (func $detect_collision (param $x1 f32) (param $y1 f32) (param $r1 f32) (param $x2 f32) (param $y2 f32) (param $r2 f32) (result i32)
    (local $dx f32)
    (local $dy f32)
    (local $dist_sq f32)
    (local $r_sum f32)
    (local $r_sum_sq f32)
    local.get $x1
    local.get $x2
    f32.sub
    local.set $dx
    local.get $y1
    local.get $y2
    f32.sub
    local.set $dy
    local.get $dx
    local.get $dx
    f32.mul
    local.get $dy
    local.get $dy
    f32.mul
    f32.add
    local.set $dist_sq
    local.get $r1
    local.get $r2
    f32.add
    local.set $r_sum
    local.get $r_sum
    local.get $r_sum
    f32.mul
    local.set $r_sum_sq
    local.get $dist_sq
    local.get $r_sum_sq
    f32.lt
    if (result i32)
      i32.const 1
    else
      i32.const 0
    end)
  (export "calculate_force" (func $calculate_force))
  (export "calculate_velocity" (func $calculate_velocity))
  (export "calculate_distance" (func $calculate_distance))
  (export "detect_collision" (func $detect_collision))
)