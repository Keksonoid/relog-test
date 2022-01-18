import React, { useState, lazy, Suspense } from "react";
import { Col, Layout, Row, Space, Spin, Typography } from 'antd';
import "./App.css";
import relogApps from "./data/NeRelog_apps.json";
import relogClients from "./data/NeRelog_clients.json";

const CardList = lazy(() => import('./components/CardList'));
const Map = lazy(() => import('./components/Map'));

const Loader = () => (
  <div className="loader">
    <Space>
      <Spin size="large"/>
      <Typography.Title
        level={3}
        children="Загрузка"
      />
    </Space>
  </div>
);

function App() {
  const [setValue] = useState("");

  const filteredLocs = relogApps.filter((location) =>
    relogClients.some((client) => location.client_id === client.id)
  );



  return (
    <div className="App">
      <Layout>
        <Layout.Content>
          <Suspense fallback={<Loader/>}>
            <Row gutter={8}>
              <Col span={8}>
              <CardList
                  locs={filteredLocs}
                  clients={relogClients}
                  setValue={setValue}
                />
              </Col>
              <Col span={16}>
                <Map locs={filteredLocs} clients={relogClients} />
              </Col>
            </Row>
          </Suspense>
        </Layout.Content>
      </Layout>
      
      
    </div>
  );
}

export default App;
