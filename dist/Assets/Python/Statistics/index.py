# Opossum Ride Adventure - Python Biometric & Population Statistics
# Compatible with Pyodide, NumPy, and SciPy in browser WebAssembly memory.

import numpy as np
from scipy import stats

def calculate_passel_biometrics_summary(shoulder_heights_inches):
    """
    Computes statistical distribution parameters for an opossum passel.
    """
    data = np.array(shoulder_heights_inches, dtype=np.float64)
    mean_val = float(np.mean(data))
    std_val = float(np.std(data))
    variance_val = float(np.var(data))
    skewness_val = float(stats.skew(data)) if len(data) > 2 else 0.0
    
    return {
        "mean_shoulder_height": mean_val,
        "std_deviation": std_val,
        "variance": variance_val,
        "skewness": skewness_val,
        "min_height": float(np.min(data)),
        "max_height": float(np.max(data))
    }
