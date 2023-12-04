@description('Name of the app service plan')
param appServicePlanName string = 'gdb-project-appservice'

@description('Location of the resource')
param location string = resourceGroup().location

@allowed([ 'F1' ])
@description('SKU')
param sku string = 'F1'

@description('Name of the website')
@maxLength(30)
param webSiteName string = 'gdb-project'

@allowed([ 'NODE|16-lts', 'NODE|14-lts' ])
@description('Version of the linux runtime')
param linuxVer string = 'NODE|16-lts'

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: sku
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: webSiteName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: linuxVer
    }
  }
}
