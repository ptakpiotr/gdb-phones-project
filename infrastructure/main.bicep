@description('Location of the resource')
param location string = resourceGroup().location

@description('Name of the operation insights')
param operationalName string = 'app-cnt-operational-insights'

@description('Name of the env')
param envName string

@description('Name of the container')
param containerName string = 'app-cnt'

@description('Backend URL')
@secure()
param backendUrl string = ''

resource operationalInsights 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: operationalName
  location: location
  properties: {
    sku: {
      name: 'Free'
    }
  }
}

resource env 'Microsoft.App/managedEnvironments@2022-03-01' existing = {
  name: envName
}

resource containerApp 'Microsoft.App/containerApps@2022-03-01' = {
  name: containerName
  location: location
  properties: {
    managedEnvironmentId: env.id
    configuration: {
      registries: [
        {
          server: 'hub.docker.com'
          username: 'pioptak'
        }
      ]
      ingress: {
        external: true
        targetPort: 3000
      }
    }
    template: {
      containers: [
        {
          image: 'pioptak/gdb-frontend'
          name: 'gdb-frontend'
          env: [
            {
              name: 'REACT_APP_BACKEND_URL'
              value: backendUrl
            }
          ]
        }
      ]
      scale: {
        minReplicas: 0
        maxReplicas: 1
      }
    }
  }
}
