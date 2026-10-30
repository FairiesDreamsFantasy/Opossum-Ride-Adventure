# Opossum Ride Adventure - Python Kinematics & Gait Analytics
# Compatible with Pyodide and NumPy in browser WebAssembly memory.

import numpy as np

def calculate_stride_frequencies(velocities_mps, leg_lengths_meters):
    """
    Calculates Froude numbers and stride frequencies across velocity vectors.
    """
    v = np.array(velocities_mps, dtype=np.float64)
    l = np.array(leg_lengths_meters, dtype=np.float64)
    g = 9.81
    
    froude_numbers = (v ** 2) / (g * l)
    stride_frequencies = v / (2.0 * l)
    
    return {
        "froude_numbers": froude_numbers.tolist(),
        "stride_frequencies": stride_frequencies.tolist(),
        "peak_froude": float(np.max(froude_numbers))
    }
