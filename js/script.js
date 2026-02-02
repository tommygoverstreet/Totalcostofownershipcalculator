document.getElementById('tco-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page refresh

    // 1. Gather Input Data
    const makeModel = document.getElementById('makeModel').value;
    const price = parseFloat(document.getElementById('price').value);
    const currentMiles = parseFloat(document.getElementById('currentMiles').value);
    const annualMiles = parseFloat(document.getElementById('annualMiles').value);
    const mpg = parseFloat(document.getElementById('mpg').value);
    const fuelCostPerGal = parseFloat(document.getElementById('fuelCost').value);

    // 2. Perform Calculations (1 Year Projection for this example)
    const annualFuelCost = (annualMiles / mpg) * fuelCostPerGal;
    
    // Dynamic Maintenance Logic:
    // Costs increase based on which "50k mile block" the truck is in.
    // This is a simplified multiplier logic.
    let maintenanceCost = 0;
    const baseMaintRate = 0.08; // $0.08 per mile base
    
    // Determine age factor based on current mileage (Block of 50k)
    const mileageBlock = Math.floor(currentMiles / 50000);
    // Add 10% to maintenance cost for every 50k miles on the odometer
    const adjustedMaintRate = baseMaintRate * (1 + (mileageBlock * 0.10));
    
    maintenanceCost = annualMiles * adjustedMaintRate;

    const totalAnnualCost = (price / 5) + annualFuelCost + maintenanceCost; // Assuming 5-year depreciation for simplicity
    const costPerMile = totalAnnualCost / annualMiles;

    // 3. Create the Vehicle Card HTML
    const cardHTML = `
        <div class="vehicle-card">
            <div class="card-header">
                <h3>${makeModel}</h3>
                <small>${currentMiles.toLocaleString()} miles (Odo)</small>
            </div>
            <div class="card-stats">
                <div class="stat-row">
                    <span>Est. Fuel Cost:</span>
                    <span>$${annualFuelCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div class="stat-row">
                    <span>Est. Maint (Block ${mileageBlock}):</span>
                    <span>$${maintenanceCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                 <div class="stat-row">
                    <span>Maint Rate/Mile:</span>
                    <span>$${adjustedMaintRate.toFixed(3)}</span>
                </div>
                <div class="stat-row stat-total">
                    <span>1-Year TCO:</span>
                    <span>$${totalAnnualCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                </div>
                <div class="stat-row">
                    <span>Cost Per Mile:</span>
                    <span>$${costPerMile.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;

    // 4. Inject into the DOM
    document.getElementById('vehicle-cards-container').insertAdjacentHTML('beforeend', cardHTML);

    // Optional: Clear form
    // document.getElementById('tco-form').reset();
});
