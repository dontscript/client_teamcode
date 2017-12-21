import React from 'react';
import {connect} from 'react-redux';
import {
    Grid,
    Header,
    Icon,
    Statistic
} from 'semantic-ui-react';

import CountUp from 'react-countup';



const NOT_DECIDED = -1, ACCEPTED = 1, DECLINED = 0;

class EstimatedStatistics extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <Grid columns={2}>
                <Grid.Row textAlign="center">
                    <Grid.Column textAlign="center">
                      <Header as='h3'>Thông số ban đầu</Header>
                      <Statistic size="tiny">
                        <Statistic.Value>
                          {Math.round(this.props.projectReducer.projectWillCreate.duration*100)/100} <Icon name="calendar"/>
                        </Statistic.Value>
                        <Statistic.Label>Tháng</Statistic.Label>
                      </Statistic>

                      <Statistic size="tiny">
                        <Statistic.Value>
                          {this.props.estimateReducer.KLOC*1000} <Icon name="file text outline"/>
                        </Statistic.Value>
                        <Statistic.Label>SLOC</Statistic.Label>
                      </Statistic>

                    </Grid.Column>

                    <Grid.Column textAlign="center">
                      <Header as='h3'>Thông số ước tính</Header>
                      <Statistic size="tiny">
                        <Statistic.Value>
                          {
                            Math.round(this.props.projectReducer.projectWillCreate.duration*100)/100
                          } <Icon name="calendar"/>
                        </Statistic.Value>
                        <Statistic.Label>Tháng</Statistic.Label>
                      </Statistic>

                      <Statistic size="tiny">
                        <Statistic.Value>
                          {
                            this.props.estimateReducer.estimatedResult.suitableStaffs.length
                          } <Icon name='users'/>
                        </Statistic.Value>
                        <Statistic.Label>Người</Statistic.Label>
                      </Statistic>

                      <Statistic size="tiny">
                        <Statistic.Value>
                          {Math.round(this.props.estimateReducer.estimatedResult.projectCostPerMonth*100)/100} <Icon name="usd"/>
                        </Statistic.Value>
                        <Statistic.Label>Chi Phí/Tháng</Statistic.Label>
                      </Statistic>

                      <Statistic size="tiny">
                        <Statistic.Value>
                          {
                            Math.round(((Math.round(this.props.estimateReducer.estimatedResult.projectCostPerMonth*100)/100) *
                            (Math.round(this.props.projectReducer.projectWillCreate.duration*100)/100))*100)/100
                          } <Icon name="usd"/>
                        </Statistic.Value>
                        <Statistic.Label>Tổng chi phí</Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

// export default Estimate;


const mapStateToProps = (state) => {
    return {
        estimateReducer: state.estimateReducer,
        projectReducer: state.projectReducer
    };
}

export default connect(mapStateToProps)(EstimatedStatistics);