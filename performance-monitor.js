/**
 * Performance Monitor for Pattern Number Generator
 * Tracks and reports performance metrics for optimization
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      patternIdentification: [],
      numberGeneration: [],
      csvExport: [],
      domUpdates: []
    };
    this.thresholds = {
      patternIdentification: 50, // ms
      numberGeneration: 500,     // ms
      csvExport: 1000,          // ms
      domUpdate: 100            // ms
    };
  }

  /**
   * Start timing an operation
   * @param {string} operation - Operation name
   * @returns {function} Function to call when operation completes
   */
  startTiming(operation) {
    const start = performance.now();
    
    return (metadata = {}) => {
      const end = performance.now();
      const duration = end - start;
      
      this.recordMetric(operation, duration, metadata);
      return duration;
    };
  }

  /**
   * Record a performance metric
   * @param {string} operation - Operation type
   * @param {number} duration - Duration in milliseconds
   * @param {object} metadata - Additional data about the operation
   */
  recordMetric(operation, duration, metadata = {}) {
    const metric = {
      timestamp: Date.now(),
      duration,
      metadata,
      threshold: this.thresholds[operation] || 1000,
      withinThreshold: duration <= (this.thresholds[operation] || 1000)
    };

    if (!this.metrics[operation]) {
      this.metrics[operation] = [];
    }

    this.metrics[operation].push(metric);

    // Keep only last 100 metrics per operation
    if (this.metrics[operation].length > 100) {
      this.metrics[operation] = this.metrics[operation].slice(-100);
    }

    // Log performance warnings
    if (!metric.withinThreshold) {
      console.warn(`Performance warning: ${operation} took ${duration.toFixed(2)}ms (threshold: ${metric.threshold}ms)`, metadata);
    }
  }

  /**
   * Get performance statistics for an operation
   * @param {string} operation - Operation type
   * @returns {object} Statistics object
   */
  getStats(operation) {
    const metrics = this.metrics[operation] || [];
    
    if (metrics.length === 0) {
      return null;
    }

    const durations = metrics.map(m => m.duration);
    const sum = durations.reduce((a, b) => a + b, 0);
    const avg = sum / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const threshold = this.thresholds[operation] || 1000;
    const withinThreshold = metrics.filter(m => m.withinThreshold).length;
    const successRate = (withinThreshold / metrics.length) * 100;

    return {
      operation,
      count: metrics.length,
      average: avg,
      min,
      max,
      threshold,
      successRate,
      lastMetrics: metrics.slice(-10)
    };
  }

  /**
   * Get all performance statistics
   * @returns {object} All statistics
   */
  getAllStats() {
    const stats = {};
    
    Object.keys(this.metrics).forEach(operation => {
      stats[operation] = this.getStats(operation);
    });

    return stats;
  }

  /**
   * Generate performance report
   * @returns {string} Formatted performance report
   */
  generateReport() {
    const stats = this.getAllStats();
    let report = '=== Performance Report ===\n\n';

    Object.entries(stats).forEach(([operation, stat]) => {
      if (!stat) return;

      report += `${operation.toUpperCase()}:\n`;
      report += `  Count: ${stat.count}\n`;
      report += `  Average: ${stat.average.toFixed(2)}ms\n`;
      report += `  Min: ${stat.min.toFixed(2)}ms\n`;
      report += `  Max: ${stat.max.toFixed(2)}ms\n`;
      report += `  Threshold: ${stat.threshold}ms\n`;
      report += `  Success Rate: ${stat.successRate.toFixed(1)}%\n`;
      report += `  Status: ${stat.successRate >= 95 ? 'GOOD' : stat.successRate >= 80 ? 'WARNING' : 'CRITICAL'}\n\n`;
    });

    return report;
  }

  /**
   * Display performance metrics in the UI
   * @param {HTMLElement} container - Container element to display metrics
   */
  displayMetrics(container) {
    if (!container) return;

    const stats = this.getAllStats();
    let html = '<div class="performance-metrics">';
    html += '<h4>Performance Metrics</h4>';

    Object.entries(stats).forEach(([operation, stat]) => {
      if (!stat) return;

      const statusClass = stat.successRate >= 95 ? 'good' : stat.successRate >= 80 ? 'warning' : 'critical';
      
      html += `
        <div class="metric">
          <span class="metric-label">${operation}:</span>
          <span class="metric-value ${statusClass}">${stat.average.toFixed(1)}ms</span>
          <span class="metric-threshold">(≤${stat.threshold}ms)</span>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  /**
   * Reset all metrics
   */
  reset() {
    this.metrics = {
      patternIdentification: [],
      numberGeneration: [],
      csvExport: [],
      domUpdates: []
    };
  }

  /**
   * Export metrics as JSON
   * @returns {string} JSON string of all metrics
   */
  exportMetrics() {
    return JSON.stringify({
      timestamp: Date.now(),
      metrics: this.metrics,
      stats: this.getAllStats()
    }, null, 2);
  }
}

// Global performance monitor instance
window.performanceMonitor = new PerformanceMonitor();

// Add CSS for performance metrics display
const performanceCSS = `
.performance-metrics {
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(224, 17, 95, 0.1);
  border-radius: 6px;
  font-size: 0.85rem;
}

.performance-metrics h4 {
  margin-bottom: 0.5rem;
  color: var(--ruby-primary);
}

.metric {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 0.25rem;
}

.metric-label {
  color: var(--text-secondary);
}

.metric-value {
  font-weight: 600;
  margin-left: 0.25rem;
}

.metric-value.good { color: #28a745; }
.metric-value.warning { color: #ffc107; }
.metric-value.critical { color: #dc3545; }

.metric-threshold {
  color: var(--text-secondary);
  font-size: 0.8em;
  margin-left: 0.25rem;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = performanceCSS;
document.head.appendChild(style);