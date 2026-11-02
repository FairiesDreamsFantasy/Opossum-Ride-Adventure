# Opossum Ride Adventure - Master Python Entry Point
# Scientific Analytics Engine powered by Pyodide / WebAssembly

from Statistics.index import calculate_passel_biometrics_summary
from Kinematics.index import calculate_stride_frequencies

def evaluate_opossum_analytics_package(heights, velocities, leg_lengths):
    """
    Evaluates complete biometric and kinematic analytical metrics.
    """
    biometrics = calculate_passel_biometrics_summary(heights)
    kinematics = calculate_stride_frequencies(velocities, leg_lengths)
    
    return {
        "biometrics": biometrics,
        "kinematics": kinematics,
        "engine": "Pyodide WebAssembly Python 3"
    }
