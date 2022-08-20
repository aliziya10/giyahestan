import React from 'react';

//TODO:: این صفحه کپی از ریپلای است و هنوز شخصی سازی نشده است

class ErrorBoundary extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               hasError: false,
               errorInfo: null
          };
     }

     componentDidCatch(error, info) {
          this.setState({
               hasError: true,
               error: error.toString(),
               errorInfo: info.componentStack
          });
     }

     render() {
          if (this.state.hasError) {
               return (
                   <div style={{direction: 'ltr'}}>
                        <h2>{"خطایی در سیستم رخ داده است"}</h2>
                        <h6>{"صفحه را دوباره بارگذاری کنید و یا با پشتیبانی تماس بگیرید"}</h6>
                        <div>
                             {this.state.error}
                        </div>
                        <div>
                             {this.state.errorInfo}
                        </div>
                   </div>
               );
          }
          return this.props.children;
     }
}


export default ErrorBoundary;
