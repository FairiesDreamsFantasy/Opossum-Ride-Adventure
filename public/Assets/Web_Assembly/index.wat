(module
  ;; Legacy 32-bit float routines
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

  ;; High-Performance 64-Bit C Native Routines (Assets/C/index.c)
  (func $calculate_opossum_trajectory_64 (param $y f64) (param $vy f64) (param $g f64) (param $dt f64) (result f64)
    local.get $y
    local.get $vy
    local.get $dt
    f64.mul
    f64.add
    f64.const 0.5
    local.get $g
    f64.mul
    local.get $dt
    f64.mul
    local.get $dt
    f64.mul
    f64.sub)

  (func $calculate_chatter_frequency_64 (param $base f64) (param $pitch f64) (result f64)
    local.get $base
    f64.const 1.0
    local.get $pitch
    f64.add
    f64.mul)

  (func $check_bounding_box_collision_64 (param $minAx f64) (param $maxAx f64) (param $minAy f64) (param $maxAy f64) (param $minBx f64) (param $maxBx f64) (param $minBy f64) (param $maxBy f64) (result i32)
    local.get $maxAx
    local.get $minBx
    f64.lt
    if (result i32)
      i32.const 0
    else
      local.get $minAx
      local.get $maxBx
      f64.gt
      if (result i32)
        i32.const 0
      else
        local.get $maxAy
        local.get $minBy
        f64.lt
        if (result i32)
          i32.const 0
        else
          local.get $minAy
          local.get $maxBy
          f64.gt
          if (result i32)
            i32.const 0
          else
            i32.const 1
          end
        end
      end
    end)

  (func $calculate_distance_3d_64 (param $x1 f64) (param $y1 f64) (param $z1 f64) (param $x2 f64) (param $y2 f64) (param $z2 f64) (result f64)
    (local $dx f64)
    (local $dy f64)
    (local $dz f64)
    local.get $x2
    local.get $x1
    f64.sub
    local.set $dx
    local.get $y2
    local.get $y1
    f64.sub
    local.set $dy
    local.get $z2
    local.get $z1
    f64.sub
    local.set $dz
    local.get $dx
    local.get $dx
    f64.mul
    local.get $dy
    local.get $dy
    f64.mul
    f64.add
    local.get $dz
    local.get $dz
    f64.mul
    f64.add
    f64.sqrt)

  ;; Exported Functions
  (export "calculate_force" (func $calculate_force))
  (export "calculate_velocity" (func $calculate_velocity))
  (export "calculate_distance" (func $calculate_distance))
  (export "detect_collision" (func $detect_collision))
  (export "calculate_opossum_trajectory_64" (func $calculate_opossum_trajectory_64))
  (export "calculate_chatter_frequency_64" (func $calculate_chatter_frequency_64))
  (export "check_bounding_box_collision_64" (func $check_bounding_box_collision_64))
  (export "calculate_distance_3d_64" (func $calculate_distance_3d_64))
)